package main

import (
	"fmt"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/src-d/go-git.v4"
	"gopkg.in/src-d/go-git.v4/plumbing"
	"log"
	"net/http"
	"strings"
)

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	fmt.Fprint(w, "Welcome!\n")
}

func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

	r.ParseForm()
	fmt.Fprintln(w, ps, r.Form)

	branch := r.Form["branch"][0]
	path := r.Form["path"][0]
	// 	mode := r.Form["mode"][0]

	fmt.Fprintln(w, branch, path, 1)

	repo, err := git.PlainOpen("./data/yxscalc")
	refs, err := repo.References()

	branch_hash_map := make(map[string]string)
	err = refs.ForEach(func(ref *plumbing.Reference) error {

		if ref.Type() == plumbing.SymbolicReference {
			return nil
		}
		refName := ref.Name().String()

		if strings.Index(refName, "refs/remotes/origin/") == 0 {
			refName = strings.Replace(refName, "refs/remotes/origin/", "", -1)
			branch_hash_map[refName] = ref.Hash().String()
			if err != nil {
				fmt.Print(err)
			}
		}
		return nil
	})

	fmt.Fprintln(w, branch_hash_map)

	branch_hash := branch_hash_map[branch]
	fmt.Fprintln(w, branch_hash)

	err = repo.Fetch(&git.FetchOptions{
		RemoteName: "origin",
	})
	if err != nil {
		fmt.Println(err)
	}

}

func main() {
	router := httprouter.New()
	router.GET("/", Index)
	router.GET("/git", Hello)

	log.Fatal(http.ListenAndServe(":8080", router))
}
