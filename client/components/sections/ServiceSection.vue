<template>
  <div class="container py-[50px]">
    <div class="grid grid-cols-12 gap-[15px]">
      <div class="col-span-7">
        <h3>Recent Jobs</h3>
        <ul>
          <li>
            <a class="flex flex-row" href="">
              <div class="">
                <img
                  src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                  alt="">
              </div>
              <div>
                <h4>Senior Health and Nutrition Advisor</h4>
                <font-awesome-icon icon="fa-solid fa-tag" />
                Senior, Health, Nutrition
                <font-awesome-icon icon="fa-solid fa-angles-up" />
                3+ years exp
                <font-awesome-icon icon="fa-solid fa-map-location" />
                Nam Tu Liem, Ha Noi
                <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                $30.000.000 - $35.000.000
              </div>
              <div>
                <button>Full Time</button>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-span-5">
        <h3>Recent Jobs</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: {
        title: 'The book guide online book store',
        content:
          'The Online Books Guide is the biggest big store and the biggest books library in the world that has alot of the popular and the most top category books presented here. Top Authors are here just subscribe your email address and get updated with us.',
      },
      serviceCards: [
        {
          icon: 'fa-solid fa-gift',
          title: 'Free gift wrap',
          description:
            'Free gift wrapping on all purchases. Wrapping includes a blue box with your choice with Ribbon.',
        },
        {
          icon: 'fa-solid fa-book',
          title: 'Buy selling used books',
          description:
            'We provide you the best selling of the used books. You can sell them to us if you have read them once.',
        },
        {
          icon: 'fa-solid fa-truck-fast',
          title: 'Free shipping',
          description:
            'We provide free shipping over the $1000 purchase from one country to another with extra discount.',
        },
        {
          icon: 'fa-solid fa-calculator',
          title: 'Returns & exchange',
          description:
            'Return and Exchange is possible in 5 days. In case of lost or damage Return & Exchange is not possible.',
        },
      ],
    }
  },
}
</script>