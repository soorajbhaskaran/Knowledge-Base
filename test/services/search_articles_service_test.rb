# frozen_string_literal: true

require "test_helper"

class SearchArticlesServiceTest < ActiveSupport::TestCase
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
  end

  def test_searching_articles_by_title
    create(:article, author: @author, status: "published", category: @category, title: "test")
    assert_equal 1, search_articles_service("test", "", "").count
  end

  def test_searching_articles_by_title_and_status
    create(:article, author: @author, status: "published", category: @category, title: "test")
    assert_equal 1, search_articles_service("test", "", "published").count
  end

  def test_searching_articles_by_title_and_categories
    create(:article, author: @author, status: "published", category: @category, title: "test")
    assert_equal 1, search_articles_service("test", [@category.id], "").count
  end

  def test_searching_articles_by_title_categories_and_status
    create(:article, author: @author, status: "published", category: @category, title: "test")
    assert_equal 1, search_articles_service("test", [@category.id], "published").count
  end

  private

    def search_articles_service(query, categories_ids, status)
      SearchArticlesService.process(query, categories_ids, status)
    end
end
