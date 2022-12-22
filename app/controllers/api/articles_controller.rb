# frozen_string_literal: true

require "json"

class API::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update show destroy visits]
  before_action :unpublished_article_cannot_be_unpublished_again_unless_there_is_publish_schedule, only: %i[update]

  def index
    @articles = current_user.articles.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
    @articles = @articles.where(status: params[:status]) if params[:status].present?
    categories_ids = JSON.parse(params[:categories_ids])
    @articles = @articles.where(category_id: categories_ids) if categories_ids.present?
  end

  def create
    current_user.articles.create! article_params
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update! article_params
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_deleted", entity: "Article"))
  end

  def filter
    filter_articles_service = FilterArticlesService.new(params[:categories_ids], params[:status])
    @articles = filter_articles_service.process
  end

  def sort
    params[:articles].each_with_index do |article, index|
      current_user.articles.find(article[:id]).update! position: index + 1
    end
  end

  def change_category
    params[:articles_ids].each do |article_id|
      article = current_user.articles.find(article_id).update! category_id: params[:category_id]
    end
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def visits
    @visits = @article.visits
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :category_id, :status).merge(restored_from: nil)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def unpublished_article_cannot_be_unpublished_again_unless_there_is_publish_schedule
      return if @article.schedules.find_by(executed: false, status: :published).present?

      if @article.status == "draft" && @article.status == article_params[:status]
        respond_with_error(t("already_unpublished", entity: "Article"))
      end
    end
end
