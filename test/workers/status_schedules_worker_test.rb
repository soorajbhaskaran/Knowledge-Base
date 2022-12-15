# frozen_string_literal: true

require "test_helper"

class StatusSchedulesWorkerTest < ActiveSupport::TestCase
  def setup
    organization = create(:organization)
    author = create(:user, organization: organization)
    category = create(:category, author: author)
    @article = create(:article, author: author, category: category)
    schedule = create(:schedule, article: @article, status: "published")
    travel_to schedule.scheduled_at
  end

  def test_status_schedules_worker_changes_the_article_status
    StatusSchedulesWorker.perform_async
    assert_equal "published", @article.reload.status
  end
end
