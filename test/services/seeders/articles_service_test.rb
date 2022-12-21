# frozen_string_literal: true

require "test_helper"

class Seeder::ArticlesServiceTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category, author: @user)
 end

  def test_should_create_article
    assert_difference "Article.count", article_service.articles_count do
      article_service.process!
    end
  end

  private

    def article_service
      Seeder::ArticlesService.new
    end
end
