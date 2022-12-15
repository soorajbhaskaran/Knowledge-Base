# frozen_string_literal: true

module Seeder
  class ArticlesService < BaseService
    ARTICLES_COUNT = 10

    attr_reader :articles_count

    def initialize
      @articles_count = ARTICLES_COUNT
    end

    def process!
      create_articles!
    end

    private

      def create_articles!
        current_user.categories.each do |category|
          articles_count.times do
            current_user.articles.create! article_attributes.merge(category: category)
          end
        end
      end

      def article_attributes
        article_attributes = {
          title: Faker::Name.name[0..30],
          content: Faker::Lorem.sentence[0..6000],
          status: "draft"
        }
      end
  end
end
