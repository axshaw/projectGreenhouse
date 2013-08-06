#!/usr/bin/env python
import unittest
import pika
import testArduinoService

class Test_TestArduinoService(unittest.TestCase):

	@unittest.mock.patch('pika.connection.Connection.connect')
	def setUp(self):
		self.connection = connection.Connection()
		self.channel = unittest.mock.Mock(spec=channel.Channel)
		self.channel.is_open = True
		self.connection._channels[1] = self.channel
		self.connection._set_connection_state(connection.Connection.CONNECTION_OPEN)
		self.obj =testArduinoService()

	def tearDown(self):
		del self.mock_conn

	def test_connection(self):
		#test the connection is openend
		self.assertEqual(self.obj.connection, self.connection)
