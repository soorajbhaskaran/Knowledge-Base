# frozen_string_literal: true

class ReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id)
    articles = Article.where(status: :published, author_id: user_id)
    html_report = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "api/articles/report/download",
      layout: "pdf"
    )
    pdf_report = WickedPdf.new.pdf_from_string html_report
    current_user = User.find(user_id)
    if current_user.report.attached?
      current_user.report.purge_later
    end
    current_user.report.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf")
    current_user.save
  end
end
