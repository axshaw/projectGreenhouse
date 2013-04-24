#include <OneWire.h>
#include <DallasTemperature.h>
 
// Data wire is plugged into pin 2 on the Arduino
#define INDOOR_FEED 4 
#define OUTDOOR_FEED 2
#define ANAL_LOG_0 0


//deinitions for database try to keep the same
#define INDOOR_SENSOR_ONE 2
#define OUTDOOR_SENSOR_ONE 1
#define LIGHT_SENSOR 3

// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire indoorWire(INDOOR_FEED);
OneWire outdoorWire(OUTDOOR_FEED);
 
int analogVal = 0;
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature indoorsensor(&indoorWire);
DallasTemperature outdoorsensor(&outdoorWire);

void setup(void)
{
  // start serial port
  Serial.begin(9600);
  

  // Start up the library
  indoorsensor.begin();
  outdoorsensor.begin();
}
 
 
void loop(void)
{
  // call sensors.requestTemperatures() to issue a global temperature
  indoorsensor.requestTemperatures(); // Send the command to get temperatures
  outdoorsensor.requestTemperatures(); // Send the command to get temperatures
  analogVal = analogRead(ANAL_LOG_0);
  
  Serial.print("{");
    Serial.print("'");
      Serial.print(2);
      Serial.print("':'");
      Serial.print( indoorsensor.getTempCByIndex(0) );
     Serial.print("'");
    Serial.print(",");
     Serial.print("'");
      Serial.print( OUTDOOR_SENSOR_ONE );
      Serial.print("':'");
      Serial.print( outdoorsensor.getTempCByIndex(0) );
     Serial.print("'");
     Serial.print(",");
     Serial.print("'");
      Serial.print( LIGHT_SENSOR );
      Serial.print("':'");
       Serial.print(analogVal);
     Serial.print("'");
    Serial.print("}");
  Serial.println("");//print line break   
  delay(30000);//delay for 10 seconds 
}
