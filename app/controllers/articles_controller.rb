# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    @articles = current_user.articles.includes(:category)
  end

  def create
    article = current_user.articles.new(article_params)
    article.save!
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  private

    def article_params
      params.require(:article).permit(:title, :content, :category_id, :status)
    end
end
