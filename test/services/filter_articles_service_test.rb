# frozen_string_literal: true

require "test_helper"

class FilterArticlesServiceTest < ActiveSupport::TestCase
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
    create(:article, author: @author, status: "published", category: @category)
    create(:article, author: @author, status: "draft", category: @category)
  end

  def test_filtering_articles_by_categories_and_status
    assert_equal 1, filter_articles_service([@category.id], "published").count
  end

  def test_filtering_articles_by_only_categories
    assert_equal 2, filter_articles_service([@category.id], "").count
  end

  private

    def filter_articles_service(categories_ids, status)
      test_filter_articles_service = FilterArticlesService.new(categories_ids, status)
      test_filter_articles_service.process
    end
end
