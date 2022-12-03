# frozen_string_literal: true

class API::Public::ArticlesController < ApplicationController
  before_action :load_article!, :check_password_presence, only: [:show]

  def index
    @published_articles = Article.where(status: "published")
    @published_articles = @published_articles.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
  end

  def show
    @article.visited
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug], status: "published")
    end
end
