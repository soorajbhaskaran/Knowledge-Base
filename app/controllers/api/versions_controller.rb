# frozen_string_literal: true

class API::VersionsController < ApplicationController
  before_action :load_article!
  before_action :load_version!, except: %i[index]

  def index
    @versions = @article.versions
  end

  def show
    render
  end

  def restore
    previous_category = current_user.categories.find(@version.reify.category_id)
    respond_with_error(t("not_found", entity: "Category")) && return unless previous_category.present?

    article = @version.reify.preserve_slug_and_add_restore_attributes(@article.slug)
    article.save!
    respond_with_success(t("successfully_restored", entity: "Article"))
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end

    def load_version!
      @version = @article.versions.find(params[:id])
    end
end
