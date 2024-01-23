{ "header": {"name": "Go", "order": 6},  "order": 5, "date": "2024-01-23 13:30" }
---
# errgroup.withContext()を使ってTimeoutでgoroutineを終了する

下記のコードではGoの[errgroup.withContext()](https://pkg.go.dev/golang.org/x/sync/errgroup#WithContext)を使って、
goroutine内でerrorが発生した場合やTimeoutが発生した場合にgoroutineを終了するようにしています。

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/errgroup"
)

func createWorker(ctx context.Context, i int) func() error {
	worker := func() error {
		fmt.Printf("before: i = %d\n", i)
		if i == 3 {
			// goroutine内でerrorにするには以下のコードのコメントをはずします。
			// return fmt.Errorf("i is %d", i)
			return nil
		}
		time.Sleep(time.Duration(i) * 100 * time.Millisecond)
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
			fmt.Printf("after: i = %d\n", i)
		}
		return nil
	}
	return worker
}

func main() {
	// Timeoutにするには以下のコードのコメントをはずします。
	// ms := 200 * time.Millisecond
	ms := 2000 * time.Millisecond
	_ctx, cancel := context.WithTimeout(context.Background(), ms)
	defer cancel()
	eg, ctx := errgroup.WithContext(_ctx)
	for i := 0; i < 5; i++ {
		eg.Go(createWorker(ctx, i))
	}
	if err := eg.Wait(); err != nil {
		log.Fatal(err)
	}
	fmt.Println("end")
}
```