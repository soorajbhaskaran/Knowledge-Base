# frozen_string_literal: true

require "test_helper"

class ReportsWorkerTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @article = create(:article, author: @user, status: :published)
  end

  def test_reports_worker_attaches_the_report_to_the_user
    ReportsWorker.perform_async(@user.id)
    assert_equal @user.report.attached?, true
  end
end
