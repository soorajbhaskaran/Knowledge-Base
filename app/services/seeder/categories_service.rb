# frozen_string_literal: true

module Seeder
  class CategoriesService < BaseService
    CATEGORIES_COUNT = 6

    attr_reader :categories_count

    def initialize
      @categories_count = CATEGORIES_COUNT
    end

    def process!
      create_categories!
    end

    private

      def create_categories!
        categories_count.times do
          current_user.categories.create! category_attributes
        end
      end

      def category_attributes
        category_attributes = {
          title: Faker::Name.name[0..14]
        }
      end
  end
end
