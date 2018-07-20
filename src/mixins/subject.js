import wepy from 'wepy'
import { int2unit } from '@/utils/unit.js'

export default class subjectMixin extends wepy.mixin {
  listHandler(subjectList) {
    subjectList.forEach((subject, index) => {
      subjectList[index].people_cnt = int2unit(subject.people_cnt)
      subjectList[index].topic_cnt = int2unit(subject.topic_cnt)
      this.next = subject.next
    })
    return subjectList
  }
}
