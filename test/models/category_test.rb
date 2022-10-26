# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_should_not_be_valid_and_saved_without_name
    @category.title = ""
    assert_not @category.valid?
    assert_includes @category.errors.full_messages, "Title can't be blank"
  end

  def test_category_should_not_saved_if_category_name_is_not_unique
    @category.save!
    test_category = @category.dup
    assert_not test_category.valid?
    assert_includes test_category.errors.full_messages, "Title has already been taken"
  end

  def test_category_title_should_not_exceed_maximum_length
    @category.title = "a" * (Category::MAX_CATEGORY_TITLE_LENGTH + 1)
    assert_not @category.valid?
  end

  def test_articles_count_should_contains_total_number_of_articles_in_category
    assert_equal @category.articles_count, @category.articles.count
  end

  def test_category_should_have_many_articles
    assert_respond_to @category, :articles
  end
end
