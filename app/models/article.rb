# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_ARTICLE_TITLE_LENGTH = 50
  MAX_ARTICLE_CONTENT_LENGTH = 10000

  enum status: { draft: "draft", published: "published" }

  belongs_to :category, counter_cache: true, foreign_key: "category_id", class_name: "Category"
  belongs_to :author, foreign_key: "author_id", class_name: "User"

  validates :title, presence: true, length: { maximum: MAX_ARTICLE_TITLE_LENGTH }
  validates :content, presence: true, length: { maximum: MAX_ARTICLE_CONTENT_LENGTH }
  validates :slug, uniqueness: true, if: -> { slug.present? }
  validate :slug_not_changed

  before_create :update_published_date_when_status_changes_to_published, :set_slug_if_article_is_published
  before_update :update_published_date_when_status_changes_to_published, :set_slug_if_article_is_published

  acts_as_list scope: :category
  has_paper_trail on: [:update], ignore: [:position]
  paginates_per 9

  private

    def set_slug_if_article_is_published
      set_slug if published? && slug.blank?
    end

    def set_slug
      title_slug = title.parameterize
      regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
      latest_article_slug =
      Article.where(status: :published).where(regex_pattern, "#{title_slug}$|#{title_slug}-[0-9]+$"
      ).order("LENGTH(slug) DESC", slug: :desc).first&.slug
      slug_count = 0
      if latest_article_slug.present?
        slug_count = latest_article_slug.split("-").last.to_i
        only_one_slug_exists = slug_count == 0
        slug_count = 1 if only_one_slug_exists
      end
      slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
      self.slug = slug_candidate
    end

    def slug_not_changed
      if slug_changed? && self.persisted?
        errors.add(:slug, t("article.slug.immutable"))
      end
    end

    def self.of_status(progress)
      if progress == :draft
        status = draft.order("updated_at DESC")
      else
        status = published.order("updated_at DESC")
      end
      status
    end

    def update_published_date_when_status_changes_to_published
      if status_changed? && published?
        self.published_date = Time.zone.now
      end
    end
end
