require 'rubygems'
require 'serialport'

class SerialProvisioner	 
	 
	 attr_accessor :connection

        def initialize 
     		@connection = SerialPort.new("/dev/pts/1", 9600, 8, 1, SerialPort::NONE)

        end
end