# frozen_string_literal: true

class SchedulesController < ApplicationController
  before_action :load_article!
  before_action :load_schedule!, only: [:delete]

  def index
    @schedules = @article.schedules.where(executed: false)
  end

  def create
    @article.schedules.create! schedule_params
    respond_with_success(t("successfully_created", entity: "Schedule"))
  end

  def delete
    @schedule.destroy!
    respond_with_success(t("successfully_deleted", entity: "Schedule"))
  end

  private

    def schedule_params
      params.require(:schedule).permit(:scheduled_at)
    end

    def load_schedule!
      @schedule = @article.schedules.find(params[:id])
    end

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end
end
