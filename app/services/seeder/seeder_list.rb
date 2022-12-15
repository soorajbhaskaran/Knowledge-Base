# frozen_string_literal: true

module Seeder
  module SeederList
    def seeders_list
      @_seeders_list ||= [
          Seeder::DatabaseCleanerService,
          Seeder::OrganizationService,
          Seeder::UserService,
          Seeder::CategoriesService,
          Seeder::ArticlesService,
      ]
    end
  end
end
