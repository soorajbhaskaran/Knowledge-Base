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

  def test_reports_worker_purges_the_previous_report
    ReportsWorker.perform_async(@user.id)
    assert_equal @user.report.attached?, true
    ReportsWorker.perform_async(@user.id)
    assert_equal @user.report.attached?, true
  end

  def test_reports_worker_produces_pdf_report
    ReportsWorker.perform_async(@user.id)
    assert_equal @user.report.attached?, true
    assert_equal @user.report.blob.content_type, "application/pdf"
  end
end
