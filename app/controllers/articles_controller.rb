# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: [:show, :update, :destroy]

  def index
    @draft_articles = current_user.articles.includes(:category).of_status(:draft)
    @published_articles = current_user.articles.includes(:category).of_status(:published)
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

  private

    def article_params
      params.require(:article).permit(:title, :content, :category_id, :status)
    end

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end
end
