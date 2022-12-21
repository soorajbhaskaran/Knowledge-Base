# frozen_string_literal: true

require "test_helper"

class ArticleUpdateWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category, status: "draft")
    @schedule = create(:schedule, article: @article, status: "published")
  end

  def test_article_update_worker_updates_the_article
    ArticleUpdateWorker.perform_async(@schedule.id)
    assert_equal "published", @article.reload.status
  end
end
