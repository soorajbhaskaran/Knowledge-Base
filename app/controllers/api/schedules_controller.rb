# frozen_string_literal: true

class API::SchedulesController < ApplicationController
  before_action :load_article!
  before_action :load_schedule!, only: [:destroy]

  def index
    @schedules = @article.schedules.where(executed: false)
  end

  def create
    existing_schedule = @article.schedules.where(executed: false).first
    respond_with_error(t("already_scheduled", entity: "Article")) && return if existing_schedule.present?

    @article.schedules.create! schedule_params
    respond_with_success(t("successfully_created", entity: "Schedule"))
  end

  def destroy
    @schedule.destroy!
    respond_with_success(t("successfully_deleted", entity: "Schedule"))
  end

  private

    def schedule_params
      params.require(:schedule).permit(:scheduled_at, :status)
    end

    def load_schedule!
      @schedule = @article.schedules.find(params[:id])
    end

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end
end
