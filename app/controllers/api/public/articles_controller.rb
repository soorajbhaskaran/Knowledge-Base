# frozen_string_literal: true

class API::Public::ArticlesController < ApplicationController
  before_action :load_article!, :check_password_presence, only: [:show]

  def index
    @articles = Article.where(status: "published")
    @articles = @articles.where("lower(title) LIKE ?", "%#{params[:query].downcase}%")
  end

  def show
    @article.visits.create!
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug], status: "published")
    end
end
