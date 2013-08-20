#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new(:automatically_recover => false)
conn.start

ch   = conn.create_channel
q    = ch.queue("GreenhouseData")

ch.default_exchange.publish("greenhouseTalking", :routing_key => q.name)
puts " [x] Sent GreenhouseTalking!"

sleep 0.5
conn.close