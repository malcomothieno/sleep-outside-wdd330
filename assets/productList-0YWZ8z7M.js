import{i as e,n as t,r as n}from"./utils-D0iIjoCx.js";import{t as r}from"./ProductData-DrXMH46o.js";function i(e){let t=e.Images&&e.Images.PrimaryLarge||e.Images&&e.Images.PrimaryMedium||e.Images&&e.Images.PrimarySmall||e.Image||``;return`<li class="product-card">
    <a href="/product_pages/index.html?product=${e.Id}">
      <img
        src="${t}"
        alt="Image of ${e.Name}"
      />
      <h3 class="card__brand">${e.Brand?e.Brand.Name:``}</h3>
      <h2 class="card__name">${e.NameWithoutBrand||e.Name}</h2>
      <p class="product-card__price">$${e.FinalPrice}</p>
    </a>
  </li>`}var a=class{constructor(e,t,n){this.category=e,this.dataSource=t,this.listElement=n}async init(){let e=await this.dataSource.getData(this.category);e&&e.Result&&Array.isArray(e.Result)&&(e=e.Result),this.renderList(e)}renderList(t){if(!Array.isArray(t)||t.length===0){this.listElement.innerHTML=`<p>No products found in this category.</p>`;return}e(i,this.listElement,t)}};n();var o=t(`category`),s=new r,c=document.querySelector(`.product-list`);if(o){let e=document.querySelector(`#category-title`);e.textContent=o.charAt(0).toUpperCase()+o.slice(1)}new a(o,s,c).init();