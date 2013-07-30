#include <OneWire.h>
#include <DallasTemperature.h>
#include <avr/wdt.h>
#include <avr/sleep.h>
#include <avr/interrupt.h> 

// Data wire is plugged into pin 2 on the Arduino
#define INDOOR_FEED 4 
#define OUTDOOR_FEED 3
#define ANAL_LOG_0 0


//deinitions for database try to keep the same
const int INDOOR_SENSOR_ONE = 2;
const int OUTDOOR_SENSOR_ONE = 1;
const int LIGHT_SENSOR = 3;

const int ledPin = 13;
const int XBeeSleep = 2;               // Connect to XBee DTR for hibernation mode
const int waitPeriod = 8;    


 
void sleepNow()
{
  /* Now is the time to set the sleep mode. In the Atmega8 datasheet
   * http://www.atmel.com/dyn/resources/prod_documents/doc2486.pdf on page 35
   * there is a list of sleep modes which explains which clocks and 
   * wake up sources are available in which sleep modes.
   *
   * In the avr/sleep.h file, the call names of these sleep modus are to be found:
   *
   * The 5 different modes are:
   *     SLEEP_MODE_IDLE         -the least power savings 
   *     SLEEP_MODE_ADC
   *     SLEEP_MODE_PWR_SAVE
   *     SLEEP_MODE_STANDBY
   *     SLEEP_MODE_PWR_DOWN     -the most power savings
   *
   *  the power reduction management &lt;avr/power.h&gt;  is described in 
   *  http://www.nongnu.org/avr-libc/user-manual/group__avr__power.html
   */
      
  set_sleep_mode(SLEEP_MODE_PWR_SAVE); // Sleep mode is set here
   
  sleep_enable();                      // Enables the sleep bit in the mcucr register
                                       // so sleep is possible. just a safety pin 
  sleep_mode();                        // Here the device is actually put to sleep!!
                                       // THE PROGRAM CONTINUES FROM HERE AFTER WAKING UP
  sleep_disable();                     // Dirst thing after waking from sleep:
                                       // disable sleep...
}
 
ISR (WDT_vect) {                       // WDT Wakeup
  cli();
  wdt_disable();
  sei();
}
 
// Variable Definition
volatile int MeasurementID = 1;
volatile int timeKeeper = 0;
volatile char XBeeIDH[8];
volatile char XBeeIDL[8];

// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire indoorWire(INDOOR_FEED);
OneWire outdoorWire(OUTDOOR_FEED);

int analogVal = 0;
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature indoorsensor(&indoorWire);
DallasTemperature outdoorsensor(&outdoorWire);

void setup(){
  // start serial port
  Serial.begin(9600);
  pinMode(XBeeSleep, OUTPUT);
   
  digitalWrite(XBeeSleep, 0);          // Enable XBee
  digitalWrite(ledPin, 1);             // Turn on Notification LED
  delay(4000);                         // 4 second LED blink, good for wireless programming
  digitalWrite(ledPin, 0);             // Turn off Notification LED
   
  digitalWrite(XBeeSleep, 1);          // Disable XBee

  // Start up the library
  indoorsensor.begin();
  outdoorsensor.begin();
}
 
 
void loop(void)
{
  if (timeKeeper == (waitPeriod-1)) {  // Transmit every 8*8 (64) seconds
  
    digitalWrite(XBeeSleep, 0);        // Enable XBee
    delay(50);                         // Wait for XBee Wakeup
     
    // call sensors.requestTemperatures() to issue a global temperature
    indoorsensor.requestTemperatures(); // Send the command to get temperatures
    outdoorsensor.requestTemperatures(); // Send the command to get temperatures
    analogVal = analogRead(ANAL_LOG_0);
    
    Serial.print("pgh{");
      Serial.print("\"");
        Serial.print( INDOOR_SENSOR_ONE );
        Serial.print("\":\"");
        Serial.print( indoorsensor.getTempCByIndex(0) );
       Serial.print("\"");
      Serial.print(",");
       Serial.print("\"");
        Serial.print( OUTDOOR_SENSOR_ONE );
        Serial.print("\":\"");
        Serial.print( outdoorsensor.getTempCByIndex(0) );
       Serial.print("\"");
       Serial.print(",");
       Serial.print("\"");
        Serial.print( LIGHT_SENSOR );
        Serial.print("\":\"");
         Serial.print(analogVal);
       Serial.print("\"");
      Serial.print("}");
    Serial.println("");//print line break   
    
     
    //delay(150000);//delay for 10 secondsshould replace with millis
    digitalWrite(ledPin, 1);           // Turn on Notification LED
    delay(2000);                         // Blink LED
    digitalWrite(ledPin, 0);           // Turn off Notification LED
     
    digitalWrite(XBeeSleep, 1);        // Disable XBee
    timeKeeper = 0;                    // Reset Timekeeper
  } else {
    digitalWrite(ledPin, 1);           // Turn on Notification LED
    delay(1);                          // Blink LED very quickly
    digitalWrite(ledPin, 0);           // Turn off Notification LED
     
    timeKeeper++;                      // Increment timekeeper variable
  }
   
  wdt_reset();                         // Get ready to go to sleep...
  watchdogEnable();                    // Turn on the watchdog timer
  sleepNow();                          // Go to sleep, watchdog timer will wake later
}
 
void watchdogEnable() {                // Turn on watchdog timer; interrupt mode every 8.0s
  cli();
  MCUSR = 0;
  WDTCSR |= B00011000;
  //WDTCSR = B01000111;                // 2 Second Timeout
  //WDTCSR = B01100000;                // 4 Second Timeout
  WDTCSR = B01100001;                  // 8 Second Timeout
  sei();
} 
