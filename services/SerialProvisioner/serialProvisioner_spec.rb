require './services/SerialProvisioner/serial_provisioner'


describe SerialProvisioner, "#sb" do 

		subject { sb }
		context '#when serial port exists' do
			let(:sb) {SerialProvisioner.new}
			specify {subject.should be_a_kind_of(SerialPort)}
			

			it "contains an open serial connection" do
				sb = SerialProvisioner.new
				sb.connection.should be_a_kind_of(SerialPort)
			end
		end

		context 'when serial port does not exist' do

			it "returns an error" do
			end
		end 

	it "stores data from the serial port" do
		sb = SerialProvisioner.new
		serialData = sb.connection.readline()
	end
