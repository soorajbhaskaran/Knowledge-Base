# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article_on_update, only: [:update]
  before_action :load_article_on_show_and_destroy, only: [:show, :destroy]

  def index
    @articles = current_user.articles.includes(:category)
    params[:status] && @articles = @articles.where(status: params[:status])
    params[:categories_ids] && @articles = @articles.map { |article|
    article if params[:categories_ids].include?(article.category_id) }.compact
  end

  def create
    article = current_user.articles.new(article_params)
    article.save!
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
    params[:categories_ids] && @categories_ids = params[:categories_ids].split(",")
    params[:query].blank? ? index : search_articles
  end

  def filter
    articles = []
    params[:categories_ids].each do |category_id|
      articles += current_user.articles.where(category_id: category_id)
    end
    @articles = articles.uniq
    params[:status] && @articles = @articles.select { |article| article.status == params[:status] }
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :category_id, :status)
    end

    def load_article_on_show_and_destroy
      @article = (params[:status] == "published") ? get_article_by_slug! : get_article_by_id!
    end

    def load_article_on_update
      @article = (params[:status] == "published" && params[:article][:slug].length > 0) ? get_article_by_slug!
      : get_article_by_id!
    end

    def get_article_by_id!
      @article = current_user.articles.find_by!(id: params[:identifier])
    end

    def get_article_by_slug!
      @article = current_user.articles.find_by!(slug: params[:identifier])
    end

    def search_articles
      @articles = current_user.articles.includes(:category).where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
      params[:status] && @articles = @articles.where(status: params[:status])
      params[:categories_ids] && @articles = @articles.map { |article|
      article if params[:categories_ids].include?(article.category_id) }.compact
    end
end
