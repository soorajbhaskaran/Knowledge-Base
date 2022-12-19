# frozen_string_literal: true

require "test_helper"

class ScheduleTest < ActiveSupport::TestCase
  def setup
    organization = create(:organization)
    author = create(:user, organization: organization)
    category = create(:category, author: author)
    @article = create(:article, author: author, category: category)
  end

  def test_scheduled_at_cannot_be_in_past
    schedule = build(:schedule, article: @article, scheduled_at: Time.zone.now - 4.hour)
    assert_not schedule.valid?
    assert_equal schedule.errors[:scheduled_at].first, t("schedules.not_past")
  end
end
