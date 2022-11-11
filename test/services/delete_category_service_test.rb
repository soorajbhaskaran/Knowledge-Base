# frozen_string_literal: true

require "test_helper"

class DeleteCategoryServiceTest < ActiveSupport::TestCase
  def setup
    @author = create(:user)
    @category = create(:category, author: @author)
  end

  def test_deleting_category_with_articles
    category = create(:category, author: @author)
    create(:article, author: @author, status: "published", category: category)
    assert_difference "Category.count", -1 do
      delete_category_service(@category.id, category)
    end
  end

  def test_deleting_last_category_with_articles
    create(:article, author: @author, status: "published", category: @category)
    assert_difference "Category.count", 0 do
      delete_category_service(nil, @category)
    end
    assert_equal Category.first.title, "General"
  end

  private

    def delete_category_service(category_id, category)
      delete_category_service = DeleteCategoryService.new(category_id, category)
      delete_category_service.process
    end
end
