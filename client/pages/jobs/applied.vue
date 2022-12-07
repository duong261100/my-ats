<template>
  <div class="container py-[50px]">
    <div class="grid grid-cols-12 gap-[30px]">
      <div class="col-span-7">
        <h3 class="mb-[30px]">Recent Jobs</h3>
        <ul class="border-[1px] border-solid border-[#ddd] rounded-[4px]">
          <li class="job">
            <a class="flex flex-row" href="">
              <div class="min-w-[60px] max-w-[60px] mt-[10px]">
                <img
                  src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                  alt="">
              </div>
              <div class="flex-1 pl-[25px] pr-[50px]">
                <h5>Java Senior</h5>
                <div class="row">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-tag" />
                    Senior, Java, English
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-angles-up" />
                    3+ years exp
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-map-location" />
                    Nam Tu Liem, Ha Noi
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                    $30.000.000 - $35.000.000
                  </span>
                </div>
              </div>
              <div class="m-auto">
                <button class="tag-custom !border-green-main !text-green-main">Applied</button>
                <button class="tag-custom !border-purple-main !text-purple-main">Pending</button>
              </div>
            </a>
          </li>
          <li class="job">
            <a class="flex flex-row" href="">
              <div class="min-w-[60px] max-w-[60px] mt-[10px]">
                <img
                  src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                  alt="">
              </div>
              <div class="flex-1 pl-[25px] pr-[50px]">
                <h5>Java Senior</h5>
                <div class="row">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-tag" />
                    Senior, Java, English
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-angles-up" />
                    3+ years exp
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-map-location" />
                    Nam Tu Liem, Ha Noi
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                    $30.000.000 - $35.000.000
                  </span>
                </div>
              </div>
              <div class="m-auto">
                <button class="tag-custom !border-green-main !text-green-main">Applied</button>
                <button class="tag-custom !border-blue-main !text-blue-main">Interviewing</button>
              </div>
            </a>
          </li>
          <li class="job">
            <a class="flex flex-row" href="">
              <div class="min-w-[60px] max-w-[60px] mt-[10px]">
                <img
                  src="https://workscout.in/wp-content/uploads/job-manager-uploads/company_logo/2021/11/company-logo-06-150x150.png"
                  alt="">
              </div>
              <div class="flex-1 pl-[25px] pr-[50px]">
                <h5>Java Senior</h5>
                <div class="row">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-tag" />
                    Senior, Java, English
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-angles-up" />
                    3+ years exp
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-map-location" />
                    Nam Tu Liem, Ha Noi
                  </span>
                  <span>
                    <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
                    $30.000.000 - $35.000.000
                  </span>
                </div>
              </div>
              <div class="m-auto">
                <button class="tag-custom !border-green-main !text-green-main">Applied</button>
                <button class="tag-custom !border-blue-soft !text-blue-soft">Accepted</button>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-span-5">
        <h3 class="mb-[30px]">Detail Jobs</h3>
        <div class="border-[1px] border-solid border-[#ddd] px-[50px] py-[35px] rounded-[4px]">
          <h4 class="text-black mb-[10px] text-[22px]">Senior Health and Nutrition Advisor</h4>
          <div class="mb-[10px] space-x-[5px]">
            <button class="tag-custom">Full Time</button>
            <button class="tag-custom">Full Time</button>
            <button class="tag-custom">Full Time</button>
          </div>
          <div class="row [&>span]:leading-[27px] mb-[20px]">
            <span>
              <font-awesome-icon icon="fa-solid fa-tag" />
              Senior, Java, English
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-angles-up" />
              3+ years exp
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-map-location" />
              Nam Tu Liem, Ha Noi
            </span>
            <span>
              <font-awesome-icon icon="fa-solid fa-money-bill-wave" />
              $30.000.000 - $35.000.000
            </span>
          </div>
          <div class="mb-[20px]">
            <span>
              Tham gia phát triển các ứng dụng, nâng cấp và triển khai các sản phẩm phần mềm theo xu hướng công nghệ
              trên
              nền tảng PHP.
              <br />
              Tìm hiểu yêu cầu, phân tích, thiết kế, nghiên cứu công nghệ công nghệ mới và review source code, đưa ra
              giải pháp áp dụng vào sản phẩm dịch vụ của công ty.
            </span>
          </div>
          <div class="text-center">
            <button class="m-auto w-1/2 bg-red-main px-[20px] py-[10px] rounded-[4px] text-white">Cancel Apply</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'home-layout',
  name: 'IndexPage',
  meta: {
    auth: { authority: 0 }
  },
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
<style scoped>
.job {
  padding: 25px 20px;
  border-left: 4px solid #186fc9;
  border-bottom: 1px solid #ddd;
}

.job:last-child {
  border-bottom: none;
}

span {
  color: #808080;
  font-size: 14px;
}

h5 {
  color: #333;
  margin-bottom: 5px;
}

svg {
  color: #808080;
  margin-right: 7px;
}

.row span {
  display: inline-block;
  margin-right: 10px;
}
</style>