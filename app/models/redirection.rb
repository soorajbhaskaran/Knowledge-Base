# frozen_string_literal: true

class Redirection < ApplicationRecord
  belongs_to :organization

  validates :from_path, presence: true, uniqueness: true
  validates :to_path, presence: true
  validate :from_path_and_to_path_cannot_be_same
  validate :check_redirection_not_possible_to_admin
  validate :check_for_redirection_loop

  private

    def from_path_and_to_path_cannot_be_same
      errors.add(:from_path, t("redirections.not_same")) if from_path == to_path
    end

    def check_redirection_not_possible_to_admin
      errors.add(:to_path, t("redirections.not_cyclic")) if to_path.start_with?("admin")
    end

    def check_for_redirection_loop
      find_redirection_loop_in_redirection_chain(from_path)
    end

    def find_redirection_loop_in_redirection_chain(from_path)
      redirection = Redirection.find_by organization: self.organization, to_path: from_path
      return unless redirection.present?

      if redirection.from_path == to_path
        errors.add(:to_path, t("redirections.not_cyclic"))
      else
        find_redirection_loop_in_redirection_chain(redirection.from_path)
      end
    end
end
