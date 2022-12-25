# frozen_string_literal: true

class Visit < ApplicationRecord
  belongs_to :article, counter_cache: true
end
