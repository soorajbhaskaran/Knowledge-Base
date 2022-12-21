# frozen_string_literal: true

require "test_helper"

class StatusSchedulesServiceTest < ActiveSupport::TestCase
  def setup
    article = create(:article, status: "draft")
    @article2 = create(:article, status: "draft")
    schedule = create(:schedule, article: article, status: "published", scheduled_at: Time.zone.now + 2.hour)
    schedule2 = create(:schedule, article: @article2, status: "published", scheduled_at: Time.zone.now + 10.minutes)
    travel_to schedule2.scheduled_at
  end

  def test_should_return_schedules_one_hour_less_than_now
    assert_equal 1, status_schedules_service.status_schedules.count
  end

  def test_should_update_articles_status
    assert_equal "draft", @article2.status
    status_schedules_service.process
    assert_equal "published", @article2.reload.status
  end

  private

    def status_schedules_service
      StatusSchedulesService.new
    end
end
