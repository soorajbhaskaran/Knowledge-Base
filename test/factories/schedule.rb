# frozen_string_literal: true

FactoryBot.define do
  factory :schedule do
    scheduled_at { Time.zone.now + 1.hour }
    status { "published" }
    executed { false }
    queued { false }
    association :article, factory: :article
  end
end
