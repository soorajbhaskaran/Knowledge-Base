# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @author = create(:user)
    @category = create(:category)
    @article = create(:article, author: @author, category: @category)
  end

  def test_values_of_created_at_and_updated_at
    article = Article.new(
      title: "Test article", content: "This is a test article content", author: @author,
      category: @category)
    assert_nil article.created_at
    assert_nil article.updated_at

    article.save!
    assert_not_nil article.created_at
    assert_equal article.updated_at, article.created_at

    article.update!(title: "Updated article")
    assert_not_equal article.updated_at, article.created_at
  end

  def test_status_should_be_draft_by_default
    article = Article.new(
      title: "Test article", content: "This is a test article content", author: @author,
      category: @category)
    assert_equal "draft", article.status
  end

  def test_published_date_should_be_nil_if_article_is_not_published
    article = create(:article, status: "draft")
    assert_nil article.published_date
  end

  def test_article_should_not_be_valid_without_author
    @article.author = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Author must exist"
  end

  def test_article_should_not_be_valid_without_category
    @article.category = nil
    assert_not @article.save
    assert_includes @article.errors.full_messages, "Category must exist"
  end

  def test_article_title_should_not_exceed_maximum_length
    @article.title = "a" * (Article::MAX_ARTICLE_TITLE_LENGTH + 1)
    assert_not @article.valid?
  end

  def test_exception_raised
    assert_raises ActiveRecord::RecordNotFound do
      Article.find(SecureRandom.uuid)
    end
  end

  def test_article_count_increases_on_saving
    assert_difference ["Article.count"], 1 do
      create(:article)
    end
  end

  def test_article_slug_is_parameterized_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_two_worded_titles
    first_article = Article.create!(
      title: "test article", author: @author, category: @category,
      content: "This is a test article content")
    second_article = Article.create!(
      title: "test article", author: @author, category: @category,
      content: "This is a test article content")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_incremental_slug_generation_for_articles_with_duplicate_hyphenated_titles
    first_article = Article.create!(
      title: "test-article", author: @author, category: @category,
      content: "This is a test article content")
    second_article = Article.create!(
      title: "test-article", author: @author, category: @category,
      content: "This is a test article content")

    assert_equal "test-article", first_article.slug
    assert_equal "test-article-2", second_article.slug
  end

  def test_slug_generation_for_articles_having_titles_one_being_prefix_of_the_other
    first_article = Article.create!(
      title: "fishing", author: @author, category: @category,
      content: "This is a test article content")
    second_article = Article.create!(
      title: "fish", author: @author, category: @category,
      content: "This is a test article content")

    assert_equal "fishing", first_article.slug
    assert_equal "fish", second_article.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_article = Article.create!(
      title: "another article", author: @author, category: @category,
      content: "This is a test article content")

    assert_raises ActiveRecord::RecordInvalid do
      another_test_article.update!(slug: @article.slug)
    end

    error_msg = another_test_article.errors.full_messages.to_sentence
    assert_match t("article.slug.taken"), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @article.reload.slug } do
      updated_article_title = "updated title"
      @article.update!(title: updated_article_title)
      assert_equal updated_article_title, @article.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = "test-article"
    first_article = Article.create!(
      title: title, author: @author, category: @category,
      content: "This is a test article content")
    second_article = Article.create!(
      title: title, author: @author, category: @category,
      content: "This is a test article content")
    third_article = Article.create!(
      title: title, author: @author, category: @category,
      content: "This is a test article content")
    fourth_article = Article.create!(
      title: title, author: @author, category: @category,
      content: "This is a test article content")

    assert_equal fourth_article.slug, "#{title.parameterize}-4"

    third_article.destroy

    expected_slug_suffix_for_new_article = fourth_article.slug.split("-").last.to_i + 1

    new_article = Article.create!(
      title: title, author: @author, category: @category,
      content: "This is a test article content")
    assert_equal new_article.slug, "#{title.parameterize}-#{expected_slug_suffix_for_new_article}"
  end

  def test_existing_slug_prefixed_in_new_article_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = "buy milk and"
    new_title = "buy milk"

    existing_article = Article.create!(
      title: title_having_new_title_as_substring, content: "This is content",
      author: @author, category: @category)
    assert_equal title_having_new_title_as_substring.parameterize, existing_article.slug

    new_article = Article.create!(title: new_title, author: @author, category: @category, content: "This is content")
    assert_equal new_title.parameterize, new_article.slug
  end

  def test_having_numbered_slug_substring_in_title_doesnt_affect_slug_generation
    title_with_numbered_substring = "buy 2 apples"

    existing_article = Article.create!(
      title: title_with_numbered_substring, author: @author, category: @category,
      content: "This is content")
    assert_equal title_with_numbered_substring.parameterize, existing_article.slug

    substring_of_existing_slug = "buy"
    new_article = Article.create!(
      title: substring_of_existing_slug, author: @author, category: @category,
      content: "This is content")

    assert_equal substring_of_existing_slug.parameterize, new_article.slug
  end

  def test_creates_multiple_articles_with_unique_slug
    articles = create_list(:article, 10, author: @author, category: @category)
    slugs = articles.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end
end
