import AccountSecurity from "./security"
const nav_tabs = [
  { id: 'grid', active: true, icon: 'fas fa-th' },
  { id: 'list', icon: 'fas fa-list-ul' },
]
// const nav_tabs = [
//   { id: 'account', active: true, text: 'account' },
//   { id: 'billing', text: 'billing' },
//   { id: 'orders', text: 'orders' },
//   { id: 'profil', text: 'profil' }
// ]

const AccountArea = () => {

  return (
    <>
    <section className="shop__area pt-100 pb-100 shop_products">
    <div className="container">
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-4">
        <div className="shop__sidebar">
        <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Billing</button>
        <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Orders</button>
        <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Security</button>
      </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-8">
          <div className="shop__content-area">
            <div className="shop__header d-sm-flex justify-content-between align-items-center mb-40">
            
              <div className="shop__header-right d-flex align-items-center justify-content-between justify-content-sm-end">
           
              </div>
            </div>
            <div className="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique ipsam vitae laudantium vero fugit odit inventore dolores, obcaecati fugiat aspernatur explicabo, ullam excepturi, commodi atque animi magni quas quod maiores!</div>
            <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ipsam officiis est aut fuga, eaque laboriosam odio non exercitationem error, voluptate explicabo labore voluptas veniam! Est cum dolorum dolore corrupti nam libero, cumque possimus ad repellat aliquam fugit labore asperiores assumenda sequi quas neque atque explicabo ipsum officiis ducimus nulla provident alias voluptate! Dolorum ex veniam similique ullam quisquam magnam consequatur et iusto, nesciunt beatae, dicta dolores ipsam qui. Ducimus nesciunt quos laborum at in quisquam aliquam accusamus, maiores corrupti eligendi corporis illo rem, autem similique dolorem optio nihil perspiciatis consequuntur architecto obcaecati magnam debitis alias velit qui? Enim, iusto! </div>
            <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
            <AccountSecurity/>
            </div>
            </div>

          </div>
        </div>

        

      </div>
    </div>
  </section>

    
    </>
  )
}

export default AccountArea
