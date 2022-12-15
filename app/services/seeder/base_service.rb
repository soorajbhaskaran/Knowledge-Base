# frozen_string_literal: true

require "faker"

module Seeder
  class BaseService
    def current_organization
      @_current_organization ||= Organization.first
    end

    def current_user
      @_current_user ||= current_organization.users.first
    end

    def print_message
      if self.class.name == "Seeder::DatabaseCleanerService"
        print "Cleaning up database..."
      else
        print "Seeding #{self.class.name}..."
      end
    end

    def print_success_message
      puts "Done"
    end

    def load_process!
      print_message
      process!
      print_success_message
    end
  end
end
