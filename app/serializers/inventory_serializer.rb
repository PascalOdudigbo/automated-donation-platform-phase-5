class InventorySerializer < ActiveModel::Serializer
  attributes :id, :item, :quantity
  has_one :beneficiary
  has_one :charity
  has_one :charity
  has_one :beneficiary
  
end
