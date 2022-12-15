# frozen_string_literal: true

module Seeder
  class SeederService < BaseService
    include Seeder::SeederList

    def process!
      ActiveRecord::Base.descendants.map(&:reset_column_information)
      ActiveRecord::Base.logger.level = Logger::INFO
      ActiveRecord::Base.transaction do
        load_data!
      rescue ActiveRecord::ActiveRecordError => error
        puts error.message
        raise ActiveRecord::Rollback
      end
    end

    private

      def load_data!
        seeders_list.each do |seeder|
          seeder.new.load_process!
        end
      end
  end
end
