# frozen_string_literal: true

require "test_helper"

class API::SchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @author = create(:user, organization: @organization)
    @category = create(:category, author: @author)
    @article = create(:article, author: @author, category: @category)
    @schedule = create(:schedule, article: @article)
  end

  def test_should_list_all_unexecuted_schedules
    get api_schedules_path, params: { article_id: @article.id }, headers: headers(@organization)
    assert_response :success
    response_json = response.parsed_body
    all_schedules = response_json["schedules"]
    assert_equal all_schedules.length, @article.schedules.where(executed: false).count
  end

  def test_should_create_schedule
    @schedule.update! executed: true
    schedule = { scheduled_at: Time.zone.now + 1.day, status: "published" }
    assert_difference "Schedule.count", 1 do
      post api_schedules_path,
        params: { article_id: @article.id, schedule: schedule }, headers: headers(@organization)
    end
    assert_response :success
  end

  def test_should_not_create_schedule_if_already_exists
    schedule = { scheduled_at: Time.zone.now + 1.day, status: "published" }
    assert_difference "Schedule.count", 0 do
      post api_schedules_path,
        params: { article_id: @article.id, schedule: schedule }, headers: headers(@organization)
    end
    assert_response :unprocessable_entity
  end

  def test_should_not_create_schedule_if_status_is_same
    @schedule.update! executed: true
    schedule = { scheduled_at: Time.zone.now + 1.day, status: @article.status }
    assert_difference "Schedule.count", 0 do
      post api_schedules_path,
        params: { article_id: @article.id, schedule: schedule }, headers: headers(@organization)
    end
    assert_response :unprocessable_entity
  end

  def test_should_destroy_schedule
    assert_difference "Schedule.count", -1 do
      delete api_schedule_path(@schedule.id), params: { article_id: @article.id }, headers: headers(@organization)
    end
    assert_response :success
  end
end
