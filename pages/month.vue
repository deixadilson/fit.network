<template>
  <div class="container">
    <div class="header">
      <h2>{{ dateDisplay }}</h2>
      <div>
        <button @click="yearNav--">&laquo; Ano -</button>
        <button @click="monthNav--">< Mês -</button>
        <button @click="yearNav = monthNav = 0">Hoje</button>
        <button @click="monthNav++">+ Mês ></button>
        <button @click="yearNav++">+ Ano &raquo;</button>
      </div>
    </div>
    <div class="weekdays">
      <div>Dom</div>
      <div>Seg</div>
      <div>Ter</div>
      <div>Qua</div>
      <div>Qui</div>
      <div>Sex</div>
      <div>Sáb</div>
    </div>
    <MonthView :days="days"/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        monthNav: 0,
        yearNav: 0,
        weekdays: ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'],
        today: new Date()
      }
    },
    computed: {
      offset() {
        return new Date(this.today.getFullYear() + this.yearNav, this.today.getMonth() + this.monthNav);
      },
      dateDisplay() {
        return this.offset.toLocaleDateString('pt-br',{month:'long', year:'numeric'});
      },
      days() {
        const firstDayofMonth = new Date(this.offset.getFullYear(), this.offset.getMonth(), 1);
        const daysInMonth = new Date(this.offset.getFullYear(), this.offset.getMonth() + 1, 0).getDate();

        const weekday = firstDayofMonth.toLocaleDateString('pt-br', { weekday: 'long' });
        const paddingDays = this.weekdays.indexOf(weekday);
        
        let dayList = [];
        for(let i = 1; i <= paddingDays + daysInMonth; i++) {
          if (i > paddingDays) {
            let date = new Date(this.offset.getFullYear(), this.offset.getMonth(), i - paddingDays).toLocaleDateString();
            let classes = this.monthNav === 0 && this.yearNav === 0 && this.today.getDate() == i - paddingDays ? ['day','today'] : ['day'];
            dayList.push({
              date: date,
              day: i - paddingDays,
              sessions: this.$store.getters.sessionsByDate(date),
              classes: classes
            });
          } else {
            dayList.push({
              classes: ['day','padding']
            });
          }
        }
        return dayList;
      }
    }
  }
</script>

<style scoped>
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }
  .header h2:first-letter {
    text-transform: capitalize;
  }
  .weekdays div {
    width: calc(100% / 7);
    text-align: center;
    font-weight: bold;  
    line-height: 200%;
    float: left;
  }
</style>