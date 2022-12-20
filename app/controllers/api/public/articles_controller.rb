# frozen_string_literal: true

class API::Public::ArticlesController < ApplicationController
  before_action :load_articles
  before_action :load_article!, :check_password_presence, only: [:show]

  def index
    @articles = @articles.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
  end

  def show
    @article.visits.create!
  end

  private

    def load_article!
      @article = @articles.find_by!(slug: params[:slug])
    end

    def load_articles
      @articles = Article.where(author: current_organization.users, status: "published")
    end
end
