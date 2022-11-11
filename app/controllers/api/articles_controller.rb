# frozen_string_literal: true

require "json"

class API::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update show destroy]

  def index
    @articles = current_user.articles.includes(:category).where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
    params[:status].present? && @articles = @articles.where(status: params[:status])
    params[:categories_ids].present? && categories_ids = JSON.parse(params[:categories_ids])
    categories_ids.present? && @articles = @articles.select { |article| categories_ids.include?(article.category_id) }
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
  end

  def update
    @article.update!(article_params)
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

  private

    def article_params
      params.require(:article).permit(:title, :content, :category_id, :status)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
