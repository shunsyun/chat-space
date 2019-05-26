Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
 root "groups#index" 
 resources :users, only: [:index, :edit, :update] do
  collection do
    get 'ajax_user_list'
  end
 end
 resources :groups, only: [:index, :new, :create, :edit, :update] do
  resources :messages, only: [:index, :create]
 end
end
