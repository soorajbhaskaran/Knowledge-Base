# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name { "Oliver" }
    last_name { "Smith" }
    email { "oliver@example.com" }
    password { "password" }
    password_confirmation { "password" }
    role { "super_admin" }
    info { true }
    association :organization, factory: :organization
  end
end
