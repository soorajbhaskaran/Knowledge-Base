# frozen_string_literal: true

class API::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[update show destroy]

  def index
    @articles = current_user.articles.includes(:category)
    !params[:status].blank? && @articles = @articles.where(status: params[:status])
    !params[:categories_ids].blank? && @articles = @articles.map { |article|
  article if params[:categories_ids].include?(article.category_id) }.compact
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

  def search
    !params[:categories_ids].blank? && @categories_ids = params[:categories_ids].split(",")
    params[:query].blank? ? index : @articles = SearchArticlesService.process(
      params[:query], @categories_ids,
      params[:status])
  end

  def filter
    @articles = FilterArticlesService.process(params[:categories_ids], params[:status])
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :category_id, :status)
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
