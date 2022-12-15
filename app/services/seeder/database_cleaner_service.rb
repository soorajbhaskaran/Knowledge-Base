# frozen_string_literal: true

module Seeder
  class DatabaseCleanerService < BaseService
    def process!
      DatabaseCleaner.clean_with :truncation
    end
  end
end
