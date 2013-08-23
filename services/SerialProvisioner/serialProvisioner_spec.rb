require './services/SerialProvisioner/serial_provisioner'


describe SerialProvisioner, "#sb" do 
	it "returns an object" do
		sb = SerialProvisioner.new
		sb.should be_a_kind_of(SerialProvisioner)
	end

	it "contains an open serial connection" do
		sb = SerialProvisioner.new
		sb.connection.should be_a_kind_of(SerialPort)
	end

	it "stores data from the serial port" do
		sb = SerialProvisioner.new
		serialData = sb.connection.readline()
	end

end