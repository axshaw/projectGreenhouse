#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='GreenhouseData')

channel.basic_publish(exchange='',
                      routing_key='GreenhouseData',
                      body='GreenhouseTalking')
print " [x] Sent 'GreenhouseTalking'"
connection.close()